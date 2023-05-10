let todolist = [];
let id = 1;

window.onload = function(){
	var btn = document.getElementById("myButton");
	btn.onclick = addList;
}

function addList(){
	let title = $('#title').val();
	let msg = $('#msg').val();
	if(title == "" || msg == "") {
		alert("請輸入標題和內容!");
	} else {
		let newTodo = {
			'id': id,
			'title': title,
			'msg': msg,
			'status': false
		};
		todolist.push(newTodo);
		//待會把新增的呈現在網頁上
		newList(newTodo);
		id++;
		//回復輸入欄空白
		$('#title').val('');
		$('#msg').val('');
	}
}

function newList(data){
	let status = (data.status)?"checked":"";
	let content =
		`<div class="input-group mb-3" id="${data.id}">
			<div class="input-group-prepend">
				<div class="input-group-text">
					<input type="checkbox" class="myCheck" onclick="checkStatus('${data.id}', this)">
				</div>
			</div>
			<input type="text" class="form-control col-sm-3" id="title${data.id}" value="${data.title}" readonly>
			<input type="text" class="form-control col-sm-9" id="msg${data.id}" value="${data.msg}" readonly>
			<div class="input-group-append" id="button-addon4">
				<button class="btn btn-outline-secondary" type="button" id="btnEdit${data.id}" onclick="editList('${data.id}')">修改</button>
				<button class="btn btn-outline-secondary" type="button" id="btnUpdate${data.id}" onclick="updateList('${data.id}')">更新</button>
				<button class="btn btn-outline-secondary" type="button" id="btnRemove${data.id}" onclick="removeList('${data.id}')">刪除</button>
			</div>
		</div>`
	$('.container').append(content);
}

function editList(id){
	$('#btnEdit'+id).addClass("d-none");
	$('#btnRemove'+id).addClass("d-none");
	$('#btnUpdate'+id).removeClass("d-none");
	$('#title'+id).attr("readonly", false);
	$('#msg'+id).attr("readonly", false);
}

function updateList(id){
	$('#btnEdit'+id).removeClass("d-none");
	$('#btnRemove'+id).removeClass("d-none");
	$('#btnUpdate'+id).addClass("d-none");
	$('#title'+id).attr("readonly", true);
	$('#msg'+id).attr("readonly", true);
}

function removeList(id){
	let index = todolist.findIndex(element => element.id == id);
	todolist.splice(index, 1);
	$('#'+id).remove();
}

function checkStatus(id, checkStatus){
	if(checkStatus.checked){
		$('#title'+id).addClass("textDelete");
		$('#msg'+id).addClass("textDelete");
		$('#btnEdit'+id).addClass("d-none");
	} else {
		$('#title'+id).removeClass("textDelete");
		$('#msg'+id).removeClass("textDelete");
		$('#btnEdit'+id).removeClass("d-none");
	}
}