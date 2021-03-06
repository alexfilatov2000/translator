import AppProvider from './lib/AppProvider.mjs';

async function main() {
    const provider = AppProvider.create();

    provider.initApp().start();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
