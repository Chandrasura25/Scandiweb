<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,Content-Length,Accept-Encoding,Authorization,X-Requested-With");
class Config
{
    protected $localhost = 'localhost';
    protected $username = 'root';
    protected $dbName = 'scandiweb';
    protected $password = '';
    protected $IFlocalhost = 'sql310.epizy.com';
    protected $IFusername = 'epiz_33076293';
    protected $IFdbName = 'epiz_33076293_hospital';
    protected $IFpassword = 'gfz2ON1Om0';
    public $connectdb = "";
    public $res = [];
    public function __construct()
{
    $this->connectdb = new mysqli($this->localhost, $this->username, $this->password, $this->dbName);
    
    if ($this->connectdb->connect_error) {
        die("Unable to connect" . $this->connectdb->connect_error);
    } else {
        $table_name = "Products";

        $query = "CREATE TABLE IF NOT EXISTS $table_name (
            ProductID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            sku VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            price INT(10) NOT NULL,
            productType varchar(255) NOT NULL,
            size int(20),
            weight int(20),
            height int(20),
            width int(20),
            length int(20)
        )";

        $statement = $this->connectdb->query($query);

        if ($statement) {
            // echo "Table created";
        } else {
            echo "Table already exists";
        }
    }
}


    public function create($query, $binder)
{
    $statement = $this->connectdb->prepare($query);
    $statement->bind_param(...$binder);

    // Clear any remaining result sets
    while($this->connectdb->next_result()) {
        if($this->connectdb->store_result()) {
            $this->connectdb->use_result();
        }
    }

    if ($statement->execute()) {
        $this->res['success'] = true;
        $this->res['message'] = "Product created successfully";
    } else {
        $this->res['success'] = false;
        $this->res['message'] = "Product can not be created successfully";
    }
    return $this->res;
}


    public function read($query, $binder)
    {
        $statement = $this->connectdb->prepare($query);
        if ($binder) {
            $statement->bind_param(...$binder);
        }
        $getResult = $statement->execute();
        if ($getResult) {
            $fetch = $statement->get_result();
            $this->res['success'] = true;
            $this->res['result'] = mysqli_fetch_all($fetch, MYSQLI_ASSOC);

        } else {
            $this->res['success'] = false;
        }
        return $this->res;
    }

    public function delete($query, $binder){
        $statement = $this->connectdb->prepare($query);
        if ($binder) {
            $statement->bind_param(...$binder);
        }
        $deleted = $statement->execute();
        if ($deleted === false) {
            $this->res['success'] = false;
            $this->res['message'] = "An error occurred: " . $statement->error;
        } else {
            $this->res['success'] = ($statement->affected_rows > 0);
            if ($this->res['success']) {
                $this->res['message'] = "Product deleted successfully";
            } else {
                $this->res['message'] = "Product not found";
            }
        }
        return $this->res;
    }
    

}
