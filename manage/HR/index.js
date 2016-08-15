$('#personnel').w2grid({ 
    name   : 'personnelGrid', 
    style: 'font-size: 1.5em',
    url  : {
        // get    : '../HR/server/personnelSearch.php',
        // get:  '../HR/server/records.php',
        // remove : '../HR/server/remove.php',
    },
    show : {
        toolbar : true, toolbarAdd: true, toolbarDelete: true, toolbarSave: true,
    },
    toolbar: {
        items: [
            { type: 'break' },
            { type: 'button', id: 'mybutton', caption: '点我试试？', }
        ],
        onClick: function (target, data) {
            console.log(target);
        }
    },
    columns: [
        { field: 'name', caption: '姓名', size: '20%', editable: {type: 'text'}, sortable: true },
        { field: 'engName', caption: '英格力士名', size: '20%', editable: {type: 'text'}, sortable: true },
        { field: 'sex', caption: '性别', size: '20%', render: function(record){return ['女', '男'][record.sex]; }, editable: {type: 'combo', items: ['0', '1'], openOnFocus: true}, sortable: true },
        { field: 'age', caption: '年龄', size: '20%', editable: {type: 'text'}, sortable: true },
        { field: 'department', caption: '部门', size: '20%', render: function(record){return ['未分类', 'R&D'][record.department]; }, editable: {type: 'combo', items: ['0', '1', '2'], openOnFocus: true} },
    ],
    onChange: function(target, e) {
        e.onComplete = function () {
            w2ui[target].save();    
        }
    },
    onAdd: function(target, e) {
        this.add({recid: this.records.length+1});
        // $('#grid_' + target +  '_edit_'+ (this.records.length) + '_1').focus();
        var td = $('#grid_' + target +  '_rec_'+ (this.records.length) + '> td:eq(0)');
        td.trigger('click');
    },
    /*sortData: [
        { field: 'age', direction: 'asc' },
        { field: 'name', direction: 'asc' }
    ],*/
    records: [
        { recid: 1, name: "李大嘴", engName: "Li Dazui", sex: "1", age: "25", department: "1" },
        { recid: 2, name: "李二嘴", engName: "Li Erzui", sex: "1", age: "29", department: "1" },
        { recid: 3, name: "李三嘴", engName: "Li Sanzui", sex: "0", age: "60", department: "1" },
        { recid: 4, name: "李四嘴", engName: "Li Sizui", sex: "1", age: "19", department: "1" },
        { recid: 5, name: "李五嘴", engName: "Li Wuzui", sex: "0", age: "33", department: "1" },
        { recid: 6, name: "吴用", engName: "Wu Yong", sex: "1", age: "33", department: "1" },
    ]
});