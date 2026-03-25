{ pkgs }: {
    deps = [
      pkgs.lsof
      pkgs.nodePackages.vscode-langservers-extracted
      pkgs.nodePackages.typescript-language-server
    ];
  }