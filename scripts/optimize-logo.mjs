import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = process.argv[2] || 'public/logojpeg.jpeg';
const outputPath = process.argv[3] || 'public/logo_new.webp';

async function optimizeLogo() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error(`Error: File not found at ${inputPath}`);
            console.log('Please place your file in the public folder and name it "logojpeg.jpeg"');
            process.exit(1);
        }

        console.log(`Processing ${inputPath}...`);

        // First trimming to get the bounding box of the logo
        // using a higher threshold to catch JPEG compression artifacts (near-white pixels)
        const trimmedBuffer = await sharp(inputPath)
            .trim({ threshold: 40 })
            .toBuffer();

        const image = sharp(trimmedBuffer);
        const metadata = await image.metadata();

        const width = metadata.width;
        const height = metadata.height;
        const size = Math.min(width, height);

        // Create a circle mask
        const circleMask = Buffer.from(
            `<svg width="${size}" height="${size}">
         <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="black"/>
       </svg>`
        );

        await image
            .resize(size, size, { fit: 'cover' }) // Ensure it's square
            .composite([{
                input: circleMask,
                blend: 'dest-in' // Keeps only the content inside the circle
            }])
            .resize(500, 500) // Resize for web
            .toFormat('webp', { quality: 90 })
            .toFile(outputPath);

        console.log(`✅ Circular logo optimized and saved to ${outputPath}`);
    } catch (error) {
        console.error('Error processing image:', error);
        if (error.message.includes('sharp')) {
            console.log('Please ensure sharp is installed: npm install sharp');
        }
    }
}

optimizeLogo();
