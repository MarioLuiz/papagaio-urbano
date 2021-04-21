class ItemCarrinho {

    constructor(
        public id: number | undefined,
        public img: object | undefined,
        public titulo: string | undefined,
        public descricao_oferta: string | undefined,
        public valor: number | undefined,
        public quantidade: number | undefined
    ) { }
}

export { ItemCarrinho }
