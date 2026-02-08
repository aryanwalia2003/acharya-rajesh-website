import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'public/logo_new.webp';
const outputPath = 'app/icon.png';

async function generateIcon() {
    try {
        const input = path.resolve(process.cwd(), inputPath);
        const output = path.resolve(process.cwd(), outputPath);

        await sharp(input)
            .resize(32, 32)
            .toFormat('png')
            .toFile(output);
        console.log(`✅ Favicon generated at ${output}`);
    } catch (error) {
        console.error('Error generating icon:', error);
    }
}

generateIcon();
