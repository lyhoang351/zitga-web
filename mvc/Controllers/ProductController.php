<?php

class ProductController extends BaseController
{
    private $productModel;

    public function __construct()
    {
        $this->loadModel('ProductModel');
        $this->productModel = new ProductModel;
    }

    public function index()
    {
        $selectColumns = ['id', 'name'];

        $orders = [
            'column' => 'id',
            'order' => 'desc',
        ];

        $products = $this->productModel->getAll(
            $selectColumns,
            $orders   
        );

        // return $this->view('frontend.products.index', [
        //     'pageTitle' => 'Game list',
        //     'products' => $products,
        // ]);
    }

    public function store()
    {
        $data = [
            // 'id' => 1,
            'name' => 'SUMMONERS ERA',
            'category' => 'afdv',
            'release_date' => '2020-05-22',
            'image' => 'asdfs',
            'video' => 'vidf'
        ];

        $this->productModel->store($data);
    }

    public function update()
    {
        $id = $_GET['id'];

        $data = [
            'name' => 'GTA'
        ];

        $this->productModel->updateData($id, $data);
    }

    public function show()
    {
        $id = $_GET['id'];
        $product = $this->productModel->findById($id);
        return $this->view('frontend.products.show', [
            'product' => $product,
        ]);
    }

    public function delete()
    {
        $id = $_GET['id'];

        $this->productModel->destroy($id);
        echo 'Xóa thành công ! :)))))';
    }
}