import GridShoppingCartButtonComponent from "$lib/components/GridShoppingCartButtonComponent.svelte" 


export default class ShoppingCartButtonRenderer {
	constructor() {
		this.eGui = document.createElement("div");
	}

	init(params) {
		this.params = params
		this.value = params.value;
		this.btnClickedHandler = this.btnClickedHandler.bind(this);

		const button = new GridShoppingCartButtonComponent({
			target: this.eGui,
			props: {
				rowData: params.data
			}
		});

		button.$on('clicked', (event) => {
			this.btnClickedHandler(event);
		})
	}

	getGui() {
		return this.eGui;
	}

	btnClickedHandler(event) {
		this.params.clicked(this.params);
	}

	refresh(params) {
		this.value = params.value;
		this.eGui.innerHTML = '';

		return true;
	}
}
