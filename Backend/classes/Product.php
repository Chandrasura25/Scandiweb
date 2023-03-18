<?php
require "ProductAbstract.php";
class Product extends ProductAbstract
{
    protected $size;
    protected $length;
    protected $weight;
    protected $height;
    protected $width;

    public function __construct($sku, $name, $price, $productType, $size = null, $length = null, $weight = null, $height = null, $width = null)
    {
        parent::__construct($sku, $name, $price, $productType);

        $this->size = $size;
        $this->length = $length;
        $this->weight = $weight;
        $this->height = $height;
        $this->width = $width;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function setLength($length)
    {
        $this->length = $length;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function setWidth($width)
    {
        $this->width = $width;
    }
    
    public function save()
    {
        // Prepare the query
        $query ="INSERT INTO products (sku, name, price, productType, size, weight, height, length, width) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Set the parameters
        $binder =array("ssisiiiii", $this->getSku(), $this->getName(), $this->getPrice(), $this->getProductType(), $this->getSize(), $this->getWeight(), $this->getHeight(), $this->getLength(), $this->getWidth());

         return $this->create($query,$binder);

    }

    public function getProductData()
    {
        // MySQL logic for getting product data with getters
    }
}
