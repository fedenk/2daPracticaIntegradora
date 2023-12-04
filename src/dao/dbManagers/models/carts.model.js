import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                cart:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                }
            }
        ],
        default: []
    }
});

cartsSchema.plugin(mongoosePaginate);

cartsSchema.pre('find', function() {
    this.populate('courses.course');
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);