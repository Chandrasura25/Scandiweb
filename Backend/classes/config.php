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
        // $this->connectdb = new mysqli($this->IFlocalhost, $this->IFusername,$this->IFpassword, $this->IFdbName);
        if ($this->connectdb->connect_error) {
            die("Unable to connect" . $this->connectdb->connect_error);
        }
        else{
            $query = "CREATE TABLE Products (
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
            if($statement){
                echo "Table created";
            }
            else{
                echo "Table not created";
            }
        }
    }

    public function create($query, $binder)
    {
        $statement = $this->connectdb->prepare($query);
        $statement->bind_param(...$binder);
        if ($statement->execute()) {
            $this->res['success'] = true;
        } else {
            $this->res['success'] = false;
        }
        return $this->res;
    }

    public function read($query,$binder){
        $statement = $this->connectdb->prepare($query);
        if($binder){
            $statement->bind_param(...$binder);
        }
        $getResult = $statement->execute();
        if($getResult){
           $fetch = $statement -> get_result();
           $this->res['success'] = true;
           $this->res['result'] = mysqli_fetch_all($fetch,MYSQLI_ASSOC);

        }
        else{
            $this ->res['success'] = false;
        }
        return $this->res;
    }

    // public function delete(){

    // }

    // public function update(){

    // }
}
