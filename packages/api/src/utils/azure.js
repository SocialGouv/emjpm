const fs = require("fs");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const { AbortController } = require("@azure/abort-controller");
const configuration = require("~/env");

const account = configuration.azureAccountName || "";
const accountKey = configuration.azureAccountKey || "";

const createBlobService = () => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  );

  return new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
};

const getBlobContainer = (containerName) => {
  const service = createBlobService();
  return service.getContainerClient(containerName);
};

const createBlobContainer = async (containerName) => {
  const container = getBlobContainer(containerName);
  const exists = await container.exists();
  if (!exists) await container.create();
  return container;
};

const listBlobsOrderByLastModifiedDesc = async (container) => {
  const blobs = container.listBlobsFlat();

  const res = [];
  for await (const blob of blobs) {
    res.push(blob);
  }
  res.sort((a, b) => {
    const {
      properties: { lastModified: lastModified1 },
    } = a;
    const {
      properties: { lastModified: lastModified2 },
    } = b;
    const lastModifiedTime1 = lastModified1.getTime();
    const lastModifiedTime2 = lastModified2.getTime();
    if (lastModifiedTime1 < lastModifiedTime2) return 1;
    if (lastModifiedTime1 > lastModifiedTime2) return -1;
    return 0;
  });
  return res;
};

const getBlobProperties = async (container, blobName) => {
  const client = container.getBlockBlobClient(blobName);
  return client.getProperties();
};

const createBlob = async (container, blobName, filePath) => {
  const client = container.getBlockBlobClient(blobName);
  const stream = fs.createReadStream(filePath);
  const blockSize = 4 * 1024 * 1024;
  const timeout = 30 * 60 * 1000;
  const concurrency = 20;
  const options = { abortSignal: AbortController.timeout(timeout) };
  try {
    return client.uploadStream(stream, blockSize, concurrency, options);
  } catch (err) {
    console.log("Error", err);
  }
};

const readBlob = async (container, blobName, fileSize) => {
  const buffer = Buffer.alloc(fileSize);
  const client = container.getBlockBlobClient(blobName);
  const options = {
    abortSignal: AbortController.timeout(30 * 60 * 1000),
    blockSize: 4 * 1024 * 1024,
    concurrency: 20,
  };
  try {
    await client.downloadToBuffer(buffer, 0, undefined, options);
  } catch (err) {
    console.log("Error", err);
  }

  return buffer;
};
const streamBlob = async (container, blobName) => {
  const client = container.getBlockBlobClient(blobName);
  const downloadBlockBlobResponse = await client.download();
  return downloadBlockBlobResponse.readableStreamBody;
};

const deleteBlob = async (container, blobName) => {
  const client = container.getBlockBlobClient(blobName);
  try {
    return client.delete();
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = {
  createBlob,
  createBlobContainer,
  deleteBlob,
  getBlobContainer,
  getBlobProperties,
  listBlobsOrderByLastModifiedDesc,
  readBlob,
  streamBlob,
};
