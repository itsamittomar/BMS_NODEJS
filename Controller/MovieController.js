const exception = require('../Exception/base.exception');
const NotFound = require('../Exception/notFound.exception')
const { City , Movie } = require('../Models/models')

class MovieController {
    register(app){
        app.route('/getMovie/:CityId')
            .get(async (request, response , next)=>{
                try{
                    const id = request.params.CityId;
                    const movies = await Movie.findAll({
                        where: { id },
                        include: City
                    });
                    if(movies.length === 0 || !movies){
                        throw new NotFound(id)
                    }

                    return response.json(movies).statusCode(200).message("Movies fetched successfully!!")
                }
                catch(error){
                    throw new exception("Something went wrong!!")
                }
            })

        app.route('/addCity/:CityName')
            .post(async (request, response , next) =>{
                try{
                    const City = request.params.CityName;
                    const newCity = await City.create({
                        name : City
                    })
                    return response.statusCode(200).message(`${City} added to the database`)
                }
                catch(err){
                    throw new exception("Error while Adding city!!")
                }


            })
    }
}

module.exports = MovieController