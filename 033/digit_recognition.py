#!/usr/bin/env python3.14
"""
Handwritten Digit Recognition
Draw a digit (0-9) — prediction runs automatically after each stroke.
Undo/Redo buttons navigate stroke history.
"""

import os
os.environ.setdefault("TK_SILENCE_DEPRECATION", "1")

import tkinter as tk
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageTk
import pickle
import threading

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH  = os.path.join(SCRIPT_DIR, "mnist_model.pkl")
SCALER_PATH = os.path.join(SCRIPT_DIR, "mnist_scaler.pkl")

CANVAS_SIZE = 280
BRUSH       = 14


# ── Model ─────────────────────────────────────────────────────────────────────

def train_and_save(on_status):
    from sklearn.datasets import fetch_openml
    from sklearn.neural_network import MLPClassifier
    from sklearn.preprocessing import StandardScaler

    on_status("Downloading MNIST (one-time, ~12 MB)…")
    mnist = fetch_openml("mnist_784", version=1, as_frame=False, parser="liac-arff")
    X = mnist.data.astype(np.float32)
    y = mnist.target.astype(int)

    on_status("Training model… (≈1 min)")
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X[:20000])
    clf = MLPClassifier((256, 128), max_iter=30, random_state=42,
                        early_stopping=True, validation_fraction=0.1)
    clf.fit(Xs, y[:20000])

    with open(MODEL_PATH,  "wb") as f: pickle.dump(clf,    f)
    with open(SCALER_PATH, "wb") as f: pickle.dump(scaler, f)
    on_status("Model ready! Draw a digit.")
    return clf, scaler


def load_saved():
    with open(MODEL_PATH,  "rb") as f: clf    = pickle.load(f)
    with open(SCALER_PATH, "rb") as f: scaler = pickle.load(f)
    return clf, scaler


def preprocess(pil_img):
    gray = pil_img.convert("L")
    bbox = gray.getbbox()
    if not bbox:
        return None
    crop = gray.crop(bbox)
    pad  = max(crop.size) // 4
    crop = ImageOps.expand(crop, border=pad, fill=0)
    sm   = crop.resize((20, 20), Image.LANCZOS)
    out  = Image.new("L", (28, 28), 0)
    out.paste(sm, (4, 4))
    out  = out.filter(ImageFilter.GaussianBlur(0.5))
    return np.array(out, dtype=np.float32).reshape(1, -1)


# ── GUI ───────────────────────────────────────────────────────────────────────

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Handwritten Digit Recognition")
        self.geometry("620x520")
        self.resizable(False, False)

        self.clf    = None
        self.scaler = None
        self._lx = self._ly = None
        self._stroke_made = False
        self._last_status = "Loading…"
        self._tk_img = None  # keep PhotoImage reference alive

        # Stroke history: list of PIL snapshots, current position
        empty = Image.new("L", (CANVAS_SIZE, CANVAS_SIZE), 0)
        self._history  = [empty]
        self._hist_pos = 0

        self._img  = empty.copy()
        self._draw = ImageDraw.Draw(self._img)

        self._build()
        threading.Thread(target=self._load, daemon=True).start()

    # ── Layout ────────────────────────────────────────────────────────────────

    def _build(self):
        # Title
        tk.Label(self, text="✏️  Handwritten Digit Recognition",
                 font=("Helvetica", 14, "bold"), pady=8
                 ).grid(row=0, column=0, columnspan=2)

        # Canvas label
        tk.Label(self, text="Draw here ↓",
                 font=("Helvetica", 10), fg="#555"
                 ).grid(row=1, column=0, pady=(0, 2))

        # Drawing canvas
        self.canvas = tk.Canvas(self, width=CANVAS_SIZE, height=CANVAS_SIZE,
                                bg="black", cursor="crosshair",
                                highlightthickness=2, highlightbackground="#aaa")
        self.canvas.grid(row=2, column=0, padx=(16, 10), pady=(0, 10),
                         rowspan=10, sticky="n")
        self.canvas.bind("<ButtonPress-1>",   self._press)
        self.canvas.bind("<B1-Motion>",       self._drag)
        self.canvas.bind("<ButtonRelease-1>", self._release)

        # Prediction label
        tk.Label(self, text="Prediction",
                 font=("Helvetica", 10), fg="#555"
                 ).grid(row=1, column=1, sticky="w", padx=(0, 16))

        self.pred_var = tk.StringVar(value="?")
        tk.Label(self, textvariable=self.pred_var,
                 font=("Helvetica", 42, "bold"), fg="#7c3aed",
                 width=3, anchor="center"
                 ).grid(row=2, column=1, sticky="ew", padx=(0, 16))

        self.conf_var = tk.StringVar(value="—")
        tk.Label(self, textvariable=self.conf_var,
                 font=("Helvetica", 11), fg="#444"
                 ).grid(row=3, column=1, pady=(0, 6), padx=(0, 16))

        # Probability bars
        tk.Label(self, text="Probabilities",
                 font=("Helvetica", 10), fg="#555"
                 ).grid(row=4, column=1, sticky="w", padx=(0, 16))

        bar_container = tk.Frame(self)
        bar_container.grid(row=5, column=1, sticky="ew",
                           padx=(0, 16), pady=(2, 4))

        self._bars = []
        for d in range(10):
            row = tk.Frame(bar_container)
            row.pack(fill="x", pady=0)

            tk.Label(row, text=str(d), width=2,
                     font=("Helvetica", 8, "bold")).pack(side="left")

            bg = tk.Canvas(row, height=8, width=130,
                           bg="#e2e8f0", highlightthickness=0)
            bg.pack(side="left", padx=(3, 2))

            pct = tk.Label(row, text=" 0%", width=4,
                           font=("Helvetica", 7), fg="#999", anchor="w")
            pct.pack(side="left")

            self._bars.append((bg, pct))

        # Undo / Redo buttons
        hist_row = tk.Frame(self)
        hist_row.grid(row=6, column=1, sticky="ew", padx=(0, 16), pady=(0, 4))

        self.undo_btn = tk.Button(hist_row, text="◀  Undo",
                                  command=self._undo,
                                  font=("Helvetica", 10), relief="groove",
                                  padx=6, pady=5, cursor="hand2",
                                  state="disabled")
        self.undo_btn.pack(side="left", fill="x", expand=True, padx=(0, 2))

        self.redo_btn = tk.Button(hist_row, text="Redo  ▶",
                                  command=self._redo,
                                  font=("Helvetica", 10), relief="groove",
                                  padx=6, pady=5, cursor="hand2",
                                  state="disabled")
        self.redo_btn.pack(side="left", fill="x", expand=True, padx=(2, 0))

        # Clear button
        tk.Button(self, text="Clear", command=self._clear,
                  font=("Helvetica", 11), relief="groove",
                  padx=12, pady=5, cursor="hand2"
                  ).grid(row=7, column=1, sticky="ew", padx=(0, 16))

        # Status bar (click to copy)
        self.status_var = tk.StringVar(value="Loading…")
        status_label = tk.Label(self, textvariable=self.status_var,
                                font=("Helvetica", 9), fg="#555",
                                anchor="w", relief="sunken", bd=1,
                                cursor="hand2")
        status_label.grid(row=12, column=0, columnspan=2,
                          sticky="ew", padx=10, pady=(6, 8))
        status_label.bind("<Button-1>", self._copy_status)

    # ── Drawing ───────────────────────────────────────────────────────────────

    def _press(self, e):
        self._lx, self._ly = e.x, e.y
        self._stroke_made = False

    def _drag(self, e):
        x, y, r = e.x, e.y, BRUSH
        self.canvas.create_oval(x-r, y-r, x+r, y+r, fill="white", outline="")
        if self._lx is not None:
            self.canvas.create_line(self._lx, self._ly, x, y,
                                    fill="white", width=r*2,
                                    capstyle="round", smooth=True)
        self._draw.ellipse([x-r, y-r, x+r, y+r], fill=255)
        if self._lx is not None:
            self._draw.line([self._lx, self._ly, x, y], fill=255, width=r*2)
        self._lx, self._ly = x, y
        self._stroke_made = True

    def _release(self, e):
        self._lx = self._ly = None
        if not self._stroke_made:
            return
        # Save snapshot — drop any forward history when branching
        self._history = self._history[:self._hist_pos + 1]
        self._history.append(self._img.copy())
        self._hist_pos += 1
        self._refresh_hist_buttons()
        self._predict()

    # ── History ───────────────────────────────────────────────────────────────

    def _undo(self):
        if self._hist_pos > 0:
            self._hist_pos -= 1
            self._restore(self._history[self._hist_pos])
            self._refresh_hist_buttons()
            self._predict()

    def _redo(self):
        if self._hist_pos < len(self._history) - 1:
            self._hist_pos += 1
            self._restore(self._history[self._hist_pos])
            self._refresh_hist_buttons()
            self._predict()

    def _restore(self, snapshot):
        self._img  = snapshot.copy()
        self._draw = ImageDraw.Draw(self._img)
        self.canvas.delete("all")
        # Render PIL image onto canvas via PhotoImage
        rgb = self._img.convert("RGB")
        self._tk_img = ImageTk.PhotoImage(rgb)
        self.canvas.create_image(0, 0, anchor="nw", image=self._tk_img)

    def _refresh_hist_buttons(self):
        self.undo_btn.config(
            state="normal" if self._hist_pos > 0 else "disabled")
        self.redo_btn.config(
            state="normal" if self._hist_pos < len(self._history) - 1
            else "disabled")

    # ── Clear ─────────────────────────────────────────────────────────────────

    def _clear(self):
        empty = Image.new("L", (CANVAS_SIZE, CANVAS_SIZE), 0)
        self._history  = [empty]
        self._hist_pos = 0
        self._img  = empty.copy()
        self._draw = ImageDraw.Draw(self._img)
        self.canvas.delete("all")
        self._tk_img = None
        self.pred_var.set("?")
        self.conf_var.set("—")
        for bg, pct in self._bars:
            bg.delete("all")
            pct.config(text=" 0%", fg="#999")
        self._refresh_hist_buttons()

    # ── Prediction ────────────────────────────────────────────────────────────

    def _predict(self):
        if self.clf is None:
            return
        arr = preprocess(self._img)
        if arr is None:
            self.pred_var.set("?")
            self.conf_var.set("—")
            return
        probs = self.clf.predict_proba(self.scaler.transform(arr))[0]
        pred  = int(np.argmax(probs))
        self.pred_var.set(str(pred))
        self.conf_var.set(f"Confidence: {probs[pred]*100:.1f}%")
        self._update_bars(probs)

    def _update_bars(self, probs):
        best = max(probs)
        for d, (bg, pct) in enumerate(self._bars):
            bg.delete("all")
            bg.update_idletasks()
            w  = bg.winfo_width() or 130
            fw = int((probs[d] / best) * w) if best > 0 else 0
            color = "#7c3aed" if probs[d] == best else "#93c5fd"
            if fw > 0:
                bg.create_rectangle(0, 0, fw, 8, fill=color, outline="")
            pct.config(text=f"{probs[d]*100:3.0f}%",
                       fg="#5b21b6" if probs[d] == best else "#999")

    # ── Status ────────────────────────────────────────────────────────────────

    def _copy_status(self, _=None):
        self.clipboard_clear()
        self.clipboard_append(self.status_var.get())
        self._set_status("Copied!")
        self.after(1500, lambda: self.status_var.set(self._last_status))

    def _set_status(self, msg):
        self._last_status = msg
        self.after(0, lambda: self.status_var.set(msg))

    # ── Model loading ─────────────────────────────────────────────────────────

    def _load(self):
        try:
            if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
                self._set_status("Loading saved model…")
                clf, scaler = load_saved()
                self._set_status("Ready!  Draw a digit.")
            else:
                clf, scaler = train_and_save(self._set_status)
            self.clf    = clf
            self.scaler = scaler
        except Exception as e:
            self._set_status(f"Error: {e}")


if __name__ == "__main__":
    App().mainloop()
