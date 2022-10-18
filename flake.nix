{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
        {
          devShell = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs-16_x
              nodePackages.typescript-language-server
            ];

            shellHook = ''
              export PATH="$(pwd)/node_modules/.bin:$PATH";
            '';
          };
    });
}
