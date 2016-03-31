module app.productList {

    interface IProductListModel {
        title: string;
        showImage: boolean;
        products: app.domain.IProduct[]; // any[] is a list of anythings.
        //toggleImage():Function;
        toggleImage(): void;
    }

    class ProductListCtrl implements IProductListModel {
        title: string;
        showImage: boolean;
        products: app.domain.IProduct[];

        static $inject = ["dataAccessService"];// it will help in the manification procces
        constructor(private dataAccessService: app.common.DataAccessService) {
            this.title = "Product list";
            this.showImage = false;
            this.products = [];
            var productRecources = dataAccessService.getProductResource();
            productRecources.query((data: app.domain.IProduct[]) => {
               this.products = data; 
            });
        }

        toggleImage(): void {
            this.showImage = !this.showImage;
        }
    }
    angular
        .module("productManagement")
        .controller("ProductListCtrl", ProductListCtrl);
}