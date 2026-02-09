// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("my_db");

// // find all the sacles from store A
// db.sales.aggregate([
//     {
//         $match: {
//             store: "A"
//         }
//     }
// ])

// //how do i sort all sales by date in descending order?
// db.sales.aggregate([
//     {
//         $match:{
//             store:"A"
//         }
//     },
//     {
//         $sort: {
//             date: -1// for decending order
//         }
//     }
// ])

// // how to get the latest sale for a particular store?
// db.sales.aggregate([
//     {
//         $match: {
//             store: "A"   
//         }        
//     },
//     {
//         $sort: {
//             date: -1
//         }
//     },
//     {
//         $limit: 1
//     }
// ])

// //how to calculate the total sales for each store and category?

// db.sales.aggregate([
//     {
//         $group: 
//         {
//             _id: {
//                 store: "$store",
//                 category: "$category"
//             },
//             totalPrice: {
//                 $sum: "$quantity"
//             }
//         }
//     }
// ])

// // how to get total revenue for all sales

// db.sales.aggregate([
//     {
//         $group: {
            
//             _id: null,  
//             totalRevenue: {
//                 $sum: {
//                     $multiply: ["$quantity", "$price"]
//                 }
//             }
//         }
//     }
// ])

// ///how to add a field in the output that calculates the total price for each sale (quantity * price)?

// db.sales.aggregate([
//     {
//         $addFields: {
//             totalPrice: {
//                 $multiply: ["$quantity", "$price"]
//     }
//         }
//     }
// ])

// //how to calculate the average quantity sold for each store?

// db.sales.aggregate([
//     {
//         $group: {
//             _id: "$store",
//             averageQuantity: {      
//                 $avg: "$quantity"
//             }
//         }
//     }
// ])
    
// // how do i filter sales that happend on June 2, 2024 or after that date?

// db.sales.aggregate([
//     {
//         $match:{
//             date: {
//                 $gte: ISODate("2024-06-02T00:00:00Z") // $gte means greater than or equal to and ISODate is used to specify the date in ISO format
//             }
//         }
//     }
// ])

// //how do i show all the sales with customer name included in the output?
// db.sales.aggregate([
//     {
//         $lookup: {
//           from: "customers",
//           localField: "customer_id",
//           foreignField: "_id",
//           as: "customerInfo"
//         }
//     },
//     {
//         $unwind: "$customerInfo"// to deconstruct the customerInfo array and show individual customer details in the output
//     },
    
//     {
//         $project: {
//             item: 1,
//             store: 1,
//             customerName: "$customerInfo.name"
//         }
//     }
// ])

// how do i show all the sales with customer name included in the output but only for customers who are loyalty members?
db.sales.aggregate([
    {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"// to deconstruct the customerInfo array and show individual customer details in the output
    },
    
    {
        $match:{
            "customerInfo.loyalty": true
        }
    },
    {
        $project: {
                    item: 1,
                    store: 1,
                    customerName: "$customerInfo.name"
        }
    }
])

//how do i get total quantity sold grouped by whether the customer is a loyalty member or not?
db.sales.aggregate([
    {
        $lookup: {
          from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    },
    {
        $group: {
            _id: "$customerInfo.loyalty",
            totalQuantity: {
                $sum: "$quantity"
            }       
        }
    }
])

//how can i get total quantity sold per day?
db.sales.aggregate([
    {
        $group: {
            _id: {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$date"
                }
            },
            totalQuantity: {    
                $sum: "$quantity"
            }
        }
    }
])

//hpw can i bucket sales into price ranges (0-5, 6-10, 11-20) and count how many sales fall into each bucket?
db.sales.aggregate([
    {
        $bucket: {
            groupBy: "$price",
            boundaries: [0, 5, 10, 20],
            default: "Other",
            output: {
                count: { $sum: 1 },
                items: { $push: "$item" }
            }
        }
    }
])