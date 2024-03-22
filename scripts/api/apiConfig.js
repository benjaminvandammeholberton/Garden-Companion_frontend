export let BASE_URL;

if (window.location.hostname === "localhost" || window.location.hostname) {
  BASE_URL = "http://localhost:8000/api/v1";
} else {
  BASE_URL = "https://garden-companion-api-24y73.ondigitalocean.app/api/v1";
}
