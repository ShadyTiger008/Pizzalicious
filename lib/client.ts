import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "sn46vn0m",
  dataset: "production",
  apiVersion: "2023-09-12",
  useCdn: true,
  token:
    "skP1PVofxlJj0xzZ4QLnr8aHrLbRwgoTL2mBjn30m8dDWPTwOg5u58oOMMWseOJEoWr5TkchBXEC0V9XPpjh6eKqmvoCXYxmQnQnjVkIm9sjDBLWfhasZXjiw14L5duinY0jzX6X09yg6PAzgyDma8mQe6mYAu9AzZdNEdvBRmMBHxNFoRE7",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);
