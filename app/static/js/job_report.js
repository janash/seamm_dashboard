
var arrayReturn = [];
var url = location.href.split('/');
var job_id = url.slice(-1)[0];

$.ajax({
    url: `api/jobs/${job_id}`,
    async: false,
    dataType: 'json',
    success: function (data) {
        console.log(data)
        arrayReturn = [[`<a class="nav-link p-0" href="/jobs/${data.id}" title="View Details">`+data.name+'</a>', 
        data.path, 
        `<a class="nav-link p-0 btn btn-secondary" href="flowcharts/${data.flowchart_id}"><i class="fas fa-project-diagram"></i><span class="d-none d-md-inline">&nbsp;View Flowchart</span></a>`,
        `<a class="nav-link p-0 btn btn-primary" href="/jobs/${data.id}/edit">
    <i class="fa fa-edit"></i><span class="d-none d-md-inline">&nbsp; Edit</span></a>
    <a class="nav-link p-0 btn btn-danger" href="#">
        <i class="fa fa-trash "></i><span class="d-none d-md-inline">&nbsp; Delete</span></a>` ]];
    console.log(arrayReturn)
    inittable(arrayReturn);
    }
});

function inittable(data) {	
$('#job-info').DataTable( {
    "responsive": true,
    "aaData": data,
    "columnDefs": [
        { className: "sidebar-nav", "targets": [0, 1, 2, 3 ]}
    ],
    "autoWidth": false,
} );
}


function buildTree() {
    var elements = [];
        $.ajax({
            url: `api/jobs/${job_id}/files`,
            async: false,
            dataType: 'json',
            success: function (data) {
                elements = data
            }
        });
    return elements
}

var tree_elements = buildTree()

$('#js-tree').jstree({ 'core' : {
    'data' : tree_elements,
    },

"plugins" : ["search", "wholerow"],

"search": {
        "case_insensitive": true,
        "show_only_matches" : true
    },
})

$('#search').keyup(function(){
	$('#js-tree').jstree('search', $(this).val());
});

$('#job_title').text(tree_elements[0].text)


