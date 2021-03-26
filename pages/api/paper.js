const textParser = require('./server/paperParser').textSearch;


export default (req, res) => {

    const obj = {};

    if(req.method == 'POST'){
        const searched = textParser(req.body.urlText);
        searched.parsingData().then(result => {
            obj.title = searched.title;
            obj.text = searched.text;
            res.status(200).json(obj);
            console.log(obj.title);
        })
        .catch((err)=>{console.log(err);})
        return;
    }
}