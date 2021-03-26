export default (req, res) => {
    if(req.method == 'POST'){
        res.status(200).json({test:'ok'})
        console.log(req.body)
        return;
    }
}