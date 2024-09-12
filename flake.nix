{
  description = "Next.js app with Docker build";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        packages.default = pkgs.dockerTools.buildLayeredImage {
          name = "nextjs-app";
          tag = "latest";
          contents = with pkgs; [
            nodejs
            nodePackages.pnpm
            coreutils
          ];

          config = {
            Cmd = [ "pnpm" "start" ];
            WorkingDir = "/app";
            ExposedPorts = {
              "3000/tcp" = {};
            };
          };

          extraCommands = ''
            mkdir -p app
            cd app
            cp -r ${./.}/* .
            chmod -R u+w .
            pnpm install --frozen-lockfile
            pnpm run build
          '';
        };

        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            nodePackages.pnpm
          ];
        };
      }
    );
}