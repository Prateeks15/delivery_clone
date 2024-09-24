import sanityClient, { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'hmepxpnf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-22'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;