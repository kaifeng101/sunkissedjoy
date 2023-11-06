const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");
const cookieSession = require("cookie-session");
const passportStrategy = require("./config/passport");
const passport = require("passport");

const globalErrorHandler = require("./middlewares/globalErrorHandler");
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/public", express.static(__dirname + "/public"));

const AppError = require("./utils/appError");

//routes
const authRouter = require("./routes/authRoutes");
const cartRouter = require("./routes/cartRoutes");
const productRouter = require("./routes/productRoutes");
const drawingStyleRouter = require("./routes/drawing-styles");
const orderRouter = require("./routes/orderRoutes");
const userRouter = require('./routes/userRoutes');
const templateRouter = require("./routes/templateRoutes");
const draftRouter = require('./routes/draftRoutes');
const stripeRouter = require('./routes/stripeRoutes');
const oAuthRouter = require('./routes/oAuthRoutes');



app.use((req, res, next) => {
  if (req.originalUrl?.includes('webhook')) {
    next();
  } else {
    console.log(`Assigning json`)
    express.json()(req, res, next);
  }
});



app.use('/api/pay', require('./routes/stripeRoutes'));


// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

// app.use(express.json());

console.log(process.env.NODE_ENV);

//passport initialization



// $ CORS
app.use(
	cors({
		origin: "https://sunkissedjoy.netlify.app/",
		methods: "GET,POST,PUT,DELETE,PATCH",
		credentials: true,
	})
);

// app.use(
// 	cors({
// 		origin: true,
// 		methods: "GET,POST,PUT,DELETE,PATCH",
// 		credentials: true,
// 	})
// );

app.use((req, res, next) => {
    if (req.originalUrl === '/pay/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
});


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// set security http headers
app.use(helmet());

app.use(morgan("dev"));


//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 1000, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});



app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
app.use((req, res, next) => {
  next();
});

//stripe

// routes
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello🙋‍♀️");
});

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/drawing-style", drawingStyleRouter);
app.use("/api/order", orderRouter);
app.use("/api/template", templateRouter);
app.use("/api/user", userRouter);
app.use('/api/draft', draftRouter);
app.use('/api/oauth', oAuthRouter);


// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
