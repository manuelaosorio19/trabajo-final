import "./style.css"

function UsuarioForm( {onCerrar, onCrear, usuarioActualizar}) {
    function onSubmit (event){
        const usuario = Object.fromEntries(new FormData(event.target));
        usuario.id = usuarioActualizar.id;
        onCrear (usuario);
        onCerrar();
    }
    return (
        <div className="form-container">
            <form className="form" onSubmit={event => onSubmit(event)}>
                <button onClick={onCerrar} type="button">X</button>
                <label htmlFor="form-name">Nombre:</label>
                <input id="form-name" name="name" type="text" defaultValue={usuarioActualizar.name ?? ""}/>
                <label htmlFor="form-lastname">Apellido:</label>
                <input id="form-lastname" name="lastName" type="text" defaultValue={usuarioActualizar.lastName ?? ""}/>
                <label htmlFor="form-type">Type:</label>
                <select id="form-type" name="type" defaultValue={usuarioActualizar.type ?? 'NORMAL'}>
                {
                    ['ADMIN', 'SUPER_ADMIN', 'NORMAL'].map((type, index) => <option key={index}>{type}</option>)
                }
                </select>
                <label htmlFor="form-photo-url">Photo:</label>
                <input id="form-photo-url" name="photoUrl" type="text" defaultValue={usuarioActualizar.photoUrl ?? ""}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default UsuarioForm;