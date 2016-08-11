$('#personnel').w2grid({ 
    name   : 'personnelGrid', 
    style: 'font-size: 1.5em',
    url  : {
        // get    : '../HR/server/records.json',
        get:  '../HR/server/records.php',
        remove : '../HR/server/test.php',
        save   : ''
    },
    show : {
        toolbar : true
    },
    toolbar: {
        items: [
            { type: 'break' },
            { type: 'button', id: 'mybutton', caption: '点我试试？', onClick: function(){console.log('clicked');}, style: 'border: 1px solid red' }
        ],
        onClick: function (target, data) {
            console.log(target);
        }
    },
    columns: [
        // { field: 'personnelId', caption: '编号', size: '30%' },
        { field: 'name', caption: '姓名', size: '20%', editable: {type: 'text'} },
        { field: 'engName', caption: '英格力士名', size: '20%', editable: {type: 'text'} },
        { field: 'sex', caption: '性别', size: '20%', render: function(record){return ['女', '男'][record.sex]; }, editable: {type: 'combo', items: ['0', '1'], openOnFocus: true} },
        { field: 'age', caption: '年龄', size: '20%', editable: {type: 'text'} },
        { field: 'department', caption: '部门', size: '20%', editable: {type: 'combo', items: ['1', '2', '3'], openOnFocus: true} },
    ],
    onChange: function(target, e) {
        console.log(e);
        console.log(target);
        e.onComplete = function () {
            w2ui[target].save();    
        }
    },
    // records: [
    //     { recid: 1, name: '李大嘴', engName: 'Dazui', sex: '1', age: '25', department: '1' },
    // ]
});