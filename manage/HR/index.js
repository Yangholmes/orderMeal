$('#personnel').w2grid({ 
    name   : 'personnelGrid', 
    style: 'font-size: 1.5em',
    url  : {
        // get    : '../HR/server/records.json',
        get:  '../HR/server/records.php',
        remove : '../HR/server/test.php',
        save   : ''
    },
    columns: [
        // { field: 'personnelId', caption: '编号', size: '30%' },
        { field: 'name', caption: '姓名', size: '20%', editable: {type: 'text'} },
        { field: 'engName', caption: '英格力士名', size: '20%', editable: {type: 'text'} },
        { field: 'sex', caption: '性别', size: '20%', editable: {type: 'text'} },
        { field: 'age', caption: '年龄', size: '20%', editable: {type: 'text'} },
        { field: 'department', caption: '部门', size: '20%', editable: {type: 'text'} },
    ],
    // records: [
    //     { recid: 1, name: '李大嘴', engName: 'Dazui', sex: '1', age: '25', department: '1' },
    // ]
});