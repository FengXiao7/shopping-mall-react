useNavigate()
    function goSearch(event) {
        event.preventDefault()
        let url='';
        let element =event.target
        let { categoryname, categoryid_1, categoryid_2, categoryid_3 } =element.dataset;
        if(categoryname){
            if(categoryid_1){
                url=`search/?categoryname=${categoryname}&categoryid_1=${categoryid_1}`
            }else if(categoryid_2){
                url=`search/?categoryname=${categoryname}&categoryid_2=${categoryid_2}`
            }else{
                url=`search/?categoryname=${categoryname}&categoryid_3=${categoryid_3}`
            }
        }
        return url;
    }