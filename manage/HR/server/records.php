<?php 
class record{
	public $status = "success";
	public $total = 5;
	public $records = [ 
		"0"=>[ "recid" => "1", "name" => "李大嘴", "engName" => "Dazui", "sex" =>"1", "age" => "25", "department" => "666" ] ,
		"1"=>[ "recid" => "2", "name" => "李二嘴", "engName" => "Erzui", "sex" =>"0", "age" => "25", "department" => "1" ] ,
		"2"=>[ "recid" => "3", "name" => "李三嘴", "engName" => "Sanzui", "sex" =>"1", "age" => "25", "department" => "1" ] ,
		"3"=>[ "recid" => "4", "name" => "李四嘴", "engName" => "Sizui", "sex" =>"0", "age" => "25", "department" => "1" ] ,
		"4"=>[ "recid" => "5", "name" => "李五嘴", "engName" => "Wuzui", "sex" =>"1", "age" => "25", "department" => "1" ] ,
		// "5"=>[ "recid" => "6", "name" => "李六嘴", "engName" => "Liuzui", "sex" =>"1", "age" => "25", "department" => "1" ] ,
        ];
}
$r = new record;
echo json_encode($r);

/*
'{
    "status"  : "success",
    "total"   : 5,
    "records" : [
        { recid: 1, name: 李大嘴, engName: "Dazui", sex: "1", age: "25", department: "1" },
        { recid: 2, name: "李二嘴", engName: "Dazui", sex: "1", age: "25", department: "1" },
        { recid: 3, name: "李三嘴", engName: "Dazui", sex: "1", age: "25", department: "1" },
        { recid: 4, name: "李四嘴", engName: "Dazui", sex: "1", age: "25", department: "1" },
        { recid: 5, name: "李五嘴", engName: "Dazui", sex: "1", age: "25", department: "1" },
    ]
}'
*/
?>