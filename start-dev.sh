#!/bin/bash

# RK Foundation - Development Server Starter
# This script starts both the Flask API and Next.js dev server

echo "🚀 Starting RK Foundation Development Environment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

print_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

# Check if Flask is already running
check_flask() {
  if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    return 0  # Flask is running
  else
    return 1  # Flask is not running
  fi
}

# Check if Node is already running
check_node() {
  if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    return 0  # Node is running
  else
    return 1  # Node is not running
  fi
}

echo "📋 Checking ports..."
if check_flask; then
  print_warn "Flask server already running on port 5000"
else
  print_info "Port 5000 is available"
fi

if check_node; then
  print_warn "Node server already running on port 3000"
else
  print_info "Port 3000 is available"
fi

echo ""
echo "🔧 Starting servers..."
echo ""

# Start Flask API in background
print_info "Starting Flask API server..."
python flask_api.py &
FLASK_PID=$!
print_info "Flask API started (PID: $FLASK_PID)"

# Wait a moment for Flask to start
sleep 2

# Start Next.js in background
print_info "Starting Next.js development server..."
npm run dev &
NEXTJS_PID=$!
print_info "Next.js started (PID: $NEXTJS_PID)"

echo ""
echo -e "${GREEN}✅ All servers started!${NC}"
echo ""
echo "📍 Access the application:"
echo "   - Frontend: ${GREEN}http://localhost:3000${NC}"
echo "   - API Health: ${GREEN}http://localhost:5000/health${NC}"
echo ""
echo "📝 PID Information:"
echo "   - Flask API PID: $FLASK_PID"
echo "   - Next.js PID: $NEXTJS_PID"
echo ""
echo "⚠️  Press Ctrl+C to stop both servers"
echo ""

# Handle Ctrl+C
trap "
  print_warn 'Stopping servers...'
  kill $FLASK_PID 2>/dev/null
  kill $NEXTJS_PID 2>/dev/null
  echo ''
  print_info 'Servers stopped'
  exit 0
" SIGINT

# Wait for both processes
wait
