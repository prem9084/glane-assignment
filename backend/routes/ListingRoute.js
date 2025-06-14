import express from "express";
import { upload } from "../multer/storage.js";
import { authenticateToken } from "../middleware/Auth.js";
import {
  addListing,
  deleteListing,
  getAllListing,
  getListing,
  searchFilter,
  updateListing,
} from "../controllers/listingController.js";

const router = express.Router();

router.post(
  "/add-listing",
  authenticateToken,
  upload.array("images", 5),
  addListing
);
router.put(
  "/update-listing/:id",
  authenticateToken,
  upload.array("images", 5),
  updateListing
);
router.get("/search-listing", searchFilter);
router.get("/get-all", authenticateToken, getAllListing);
router.get("/get-listing/:id", getListing);
router.delete("/delete-listing/:id", authenticateToken, deleteListing);

export default router;
