const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const clientSlug = process.argv[2];

if (!clientSlug) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a client slug!');
  console.log('Usage: npm run deploy:client -- <client-slug>');
  console.log('Example: npm run deploy:client -- gaswertyu');
  process.exit(1);
}

console.log(`\x1b[36m%s\x1b[0m`, `🚀 Preparing dedicated website deployment for client: ${clientSlug}...`);

const baseOutDir = path.join(__dirname, '..', 'out');
const clientOutDir = path.join(__dirname, '..', `out-client`);

if (!fs.existsSync(baseOutDir)) {
  console.log('Building base static site first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Ensure clean client out directory
if (fs.existsSync(clientOutDir)) {
  fs.rmSync(clientOutDir, { recursive: true, force: true });
}
fs.mkdirSync(clientOutDir, { recursive: true });

// Copy entire out directory as baseline for assets (_next, svg, etc.)
fs.cpSync(baseOutDir, clientOutDir, { recursive: true });

// REPLACE root index.html with the dedicated client-store.html
const clientStoreHtml = path.join(baseOutDir, 'client-store.html');
const targetIndexHtml = path.join(clientOutDir, 'index.html');

if (fs.existsSync(clientStoreHtml)) {
  let content = fs.readFileSync(clientStoreHtml, 'utf8');
  // Inject client slug into the static HTML for runtime identification
  content = content.replace(/NEXT_PUBLIC_CLIENT_SLUG=.*?;/g, `NEXT_PUBLIC_CLIENT_SLUG="${clientSlug}";`);
  content = content.replace(/demo-store/g, clientSlug);
  fs.writeFileSync(targetIndexHtml, content, 'utf8');
  console.log(`\x1b[32m%s\x1b[0m`, `✓ Root index.html successfully configured for ${clientSlug}!`);
} else {
  console.error('client-store.html not found in out directory. Please run npm run build.');
  process.exit(1);
}

// Clean up Pixzora-specific internal pages from client deployment (Privacy & clean separation)
['admin.html', 'onboarding.html', 'zero-cost-guide.html'].forEach(file => {
  const filePath = path.join(clientOutDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
});

console.log(`\x1b[35m%s\x1b[0m`, `📡 Deploying directly to https://${clientSlug}.pages.dev...`);

try {
  execSync(`npx wrangler pages deploy "${clientOutDir}" --project-name ${clientSlug} --commit-dirty=true`, {
    stdio: 'inherit'
  });
  console.log(`\x1b[32m%s\x1b[0m`, `\n🎉 SUCCESS! Client website is LIVE: https://${clientSlug}.pages.dev\n`);
} catch (err) {
  console.error('Deployment failed:', err.message);
  process.exit(1);
}
