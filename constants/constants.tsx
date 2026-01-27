/**
|--------------------------------------------------
| Staging
|--------------------------------------------------
*/

// const hostName = "buzinessify.com";
// const BASE_URL = "https://staging.buzinessify.com";
// const DOMAIN = "https://buzinessify.com";
// const API_DOMAIN = "https://seodevapi.cloudapiserver.com";
// const REAL_STATE_API_DOMAIN = "https://realstateapi.cloudapiserver.com";
// const DEVAPI = "https://devapi.cloudapiserver.com";
// const CMSAPI = "https://cmsapi.cloudapiserver.com";
// const isIndex = false;
// const nocache = false;

/**
|--------------------------------------------------
| Live Site
|--------------------------------------------------
*/

const hostName = "buzinessify.com";
const BASE_URL = "https://buzinessify.com";
const API_DOMAIN = "https://seoapi.cloudapiserver.com";
const REAL_STATE_API_DOMAIN = "https://realstateapi.cloudapiserver.com";
const DEVAPI = "https://devapi.cloudapiserver.com";
const CMSAPI = "https://cmsapi.cloudapiserver.com";
const isIndex = true;
const nocache = true;

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
const vendorId = 1;

const jsonHeader = {
  "Content-Type": "application/json",
  Authorization: "Bearer ",
  "Accept-Encoding": "gzip, compress, br",
};

export {
  DEVAPI,
  CMSAPI,
  hostName,
  BASE_URL,
  jsonHeader,
  REAL_STATE_API_DOMAIN,
  isIndex,
  nocache,
  vendorId,
  API_DOMAIN,
};