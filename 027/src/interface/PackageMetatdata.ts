export interface Author {
  name: string;
  email: string;
  url: string;
}

export interface Version {
  name: string;
  private: boolean;
  version: string;
  description: string;
  author: Author;
  scripts: Record<string, string>;
  devDependencies: Record<string, string>;
  exports: {
    ".": {
      import: {
        types: string;
        default: string;
      };
      require: {
        types: string;
        default: string;
      };
    };
  };
  types: string;
  main: string;
  release: {
    branches: string[];
  };
  publishConfig: {
    access: string;
  };
  keywords: string[];
  gitHead: string;
  dist: {
    integrity: string;
    shasum: string;
    tarball: string;
    fileCount: number;
    unpackedSize: number;
    signatures: Array<{
      keyid: string;
      sig: string;
    }>;
  };
  directories: Record<string, never>;
  maintainers: Array<{
    name: string;
    email: string;
  }>;
}

export interface PackageMetadata {
  name: string;
  "dist-tags": {
    latest: string;
  };
  versions: Record<string, Version>;
  time: {
    created: string;
    modified: string;
  };
  maintainers: Array<{
    name: string;
    email: string;
  }>;
  description: string;
  keywords: string[];
  author: Author;
  readme: string;
  readmeFilename: string;
}
