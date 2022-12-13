const tour = require("express")();
const { search } = require("../controller/tour/search");
const show = require("../controller/tour/show");
const { tourDetail } = require("../controller/tour/tourDetail");
const { rating, getTourRating } = require("../controller/tour/rate");
const { verifyUser } = require("../verify");
const { bestSeller } = require("../controller/tour/bestSeller");
const { showCompany } = require("../controller/tour/showCompanyDetail");
const { searchRangePrice } = require("../controller/tour/searchRangePrice");
const { fourBestSeller } = require("../controller/tour/fourBestSeller");
const { relatedTour } = require("../controller/tour/relatedTour");
const { searchBycategory } = require("../controller/tour/searchByCategory");
const { sortByCategory } = require("../controller/tour/sortByCategory");
const { sortByPrice } = require("../controller/tour/sortByPrice");
const { showCompanyAuth } = require("../controller-admin/user/showCompanyAuth");

tour.get("/search", search);
tour.get("/searchbycategory", searchBycategory);
tour.get("/show/:id", tourDetail);
tour.get("/show", show);
tour.get("/showcompany", showCompanyAuth);

// --- show company detail -----------
tour.get("/showCompany/:companyId", showCompany);
tour.get("/bestseller", bestSeller);
tour.get("/category", sortByCategory);
tour.get("/price", sortByPrice);
tour.get("/fourbestseller", fourBestSeller);
tour.get("/relatedtour/:category", relatedTour);
tour.get("/rangeprice", searchRangePrice);
tour.post("/rate", verifyUser, rating);
tour.get("/rate/:tourId", getTourRating);

module.exports = tour;
