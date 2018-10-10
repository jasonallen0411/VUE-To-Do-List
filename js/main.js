const app = new Vue({
	el: "#toDoList", 
	data: {
		editList: null,
		list: [],
	},

	methods: {
		deleteItem(id, i){
			fetch("http://rest.learncode.academy/api/todolist/items/" + id, {
				method: "DELETE"
			})
			.then(() => {
				this.list.splice(i, 1);
			})
		},
		updateList(list){
			fetch("http://rest.learncode.academy/api/todolist/items/" + list.id, {
				body: JSON.stringify(list),
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(() => {
				this.editList = null;
			})
		}
	},

	mounted() {
		fetch("http://rest.learncode.academy/api/todolist/items")
		.then(response => response.json())
		.then((data) => {
		this.list = data;
		})
	},

	template: `
	<div>
		<li id="theList" v-for="lists, i in list">
			<div id="theInput" class="input-group mb-3" v-if="editList === lists.id">
				<input type="text" class="form-control" placeholder="edit here" aria-label="edit here" aria-describedby="basic-addon2" v-on:keyup.13="updateList(list)" v-model="lists.item" />
				<div class="input-group-append">
    			<button type="button" class="btn btn-success" v-on:click="updateList(list)">Save</button>
  				</div>
			</div>
			<div v-else>
			<button type="button" class="btn btn-danger" v-on:click="deleteItem(lists.id, i)">x</button>
			<button type="button" class="btn btn-primary" v-on:click="editList = lists.id">Edit</button>
			{{lists.item}}
			</div>
		</li>
	</div>
	`,	
});











