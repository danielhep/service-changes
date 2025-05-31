{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Node.js 20 LTS
    nodejs_20
    
    # pnpm package manager
    pnpm
    
    # Additional useful tools for development
    git
    
    # Build tools that might be needed for native dependencies
    python3
    pkg-config
    
    # For better development experience
    nodePackages.prettier
    nodePackages.eslint
  ];

  shellHook = ''
    echo "🚀 Development environment loaded!"
    echo "Node.js version: $(node --version)"
    echo "pnpm version: $(pnpm --version)"
    echo ""
    echo "Available commands:"
    echo "  pnpm install    - Install dependencies"
    echo "  pnpm dev        - Start development server"
    echo "  pnpm build      - Build for production"
    echo "  pnpm lint       - Run linting"
    echo ""
    
    # Ensure pnpm version matches package.json specification
    export PNPM_VERSION="9.9.0"
    
    # Set up Node.js environment
    export NODE_ENV="development"
    
    # Ensure we're using the correct package manager
    if [ ! -f "pnpm-lock.yaml" ]; then
      echo "⚠️  No pnpm-lock.yaml found. Run 'pnpm install' to initialize."
    fi
  '';

  # Environment variables
  env = {
    # Disable npm update notifications
    NPM_CONFIG_UPDATE_NOTIFIER = "false";
    
    # Use pnpm as package manager
    NPM_CONFIG_PACKAGE_MANAGER = "pnpm";
    
    # Optimize Node.js for development
    NODE_OPTIONS = "--max-old-space-size=4096";
  };
} 