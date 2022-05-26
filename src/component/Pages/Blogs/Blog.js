import React from "react";

const Blog = () => {
  return (
    <div className="container mx-auto ">
      <div>
        <h2 className="text-gray-600 text-3xl text-center my-4 italic text-semibold">
          Difference between Node.JS and Javascript
        </h2>
        <div className="grid  md:grid-cols-2  gap-5  grid-cols-1 gap-y-3 ">
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              NodeJS :{" "}
            </h2>
            <p>
              {" "}
              NodeJS is a cross-platform and opensource Javascript runtime
              environment that allows the javascript to be run on the
              server-side. Nodejs allows Javascript code to run outside the
              browser. Nodejs comes with a lot of modules and mostly used in web
              development.{" "}
            </p>
            <p className="mt-2">
              It is a cross-platform, open-source JavaScript runtime environment
              that allows JavaScript to be run on the server.
            </p>
            <p className="mt-2">
              It's a JavaScript interpreter and environment with some valuable
              libraries that JavaScript programming can use separately.
            </p>
          </div>
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              JavaScript:
            </h2>
            <p>
              Javascript is a Scripting language. It is mostly abbreviated as
              JS. It can be said that Javascript is the updated version of the
              ECMA script. Javascript is a high-level programming language that
              uses the concept of Oops but it is based on prototype inheritance.{" "}
            </p>
            <p className="mt-2">
              It is an open-source, cross-platform, interpreted, lightweight
              scripting programming language that is used to develop dynamic and
              web applications.
            </p>
            <p className="mt-2">
              It is a programming language. It works in any browser that has a
              proper browser engine.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-gray-600 text-3xl text-center my-4 italic text-semibold">
          When should you use nodejs and when should you use mongodb?
        </h2>
        <div className=" grid  md:grid-cols-2  gap-5  grid-cols-1 gap-y-3">
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              mongodb :{" "}
            </h2>
            <p>
              {" "}
              NoSQL databases like MongoDB are a good choice when your data is
              document-centric and doesn't fit well into the schema of a
              relational database, when you need to accommodate massive scale,
              when you are rapidly prototyping, and a few other use cases.{" "}
            </p>
            <p className="mt-2">
              MongoDB is the most popular of the new breed of non-relational
              NoSQL databases. Specifically, it's a document database, also
              called a document-oriented database or a document store.
            </p>
            <p className="mt-2">
              Document structures usually align with objects that developers are
              working with in code, which is a more flexible approach than the
              row-and-column table-oriented structure of a relational database.
              Developers can rework document (data) structures as their
              application requirements change over time. With this approach,
              data structures become like code — both are under developers'
              control.
            </p>
          </div>
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              Node js:
            </h2>
            <p>
              Node.js is an open-source server side runtime environment built on
              Chrome's V8 JavaScript engine. It provides an event driven,
              non-blocking (asynchronous) I/O and cross-platform runtime
              environment for building highly scalable server-side applications
              using JavaScript..{" "}
            </p>
            <p className="mt-2">
              Microservices-based architecture lets you split your application
              into small units. Each part can independently deploy and scale; it
              does not matter if different programming languages and teams write
              it. You can also test the small units individually.
            </p>
            <p className="mt-2">
              is the greatest tool for building real-time web applications. It
              provides cross-platform applications which run easily on any web.
              So you basically don't need anything extra for running up a node
              application. You only need for making one.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-gray-600 text-3xl text-center my-4 italic text-semibold">
          Differences between sql and nosql databases.
        </h2>
        <div className="     grid  md:grid-cols-2  gap-5  grid-cols-1 gap-y-3">
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              SQL : relational :{" "}
            </h2>
            <p> Tables with fixed rows and columns </p>
            <p className="mt-2">
              Developed in the 1970s with a focus on reducing data duplication
            </p>
            <p className="mt-2">
              These databases are not suited for hierarchical data storage.
            </p>
            <p className="mt-2">are vertically scalable are table based</p>
          </div>
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              NoSQL: non-relational:
            </h2>
            <p>
              Document: JSON documents, Key-value: key-value pairs, Wide-column:
              tables with rows and dynamic columns, Graph: nodes and edges{" "}
            </p>
            <p className="mt-2">
              Developed in the late 2000s with a focus on scaling and allowing
              for rapid application change driven by agile and DevOps practices.
            </p>
            <p className="mt-2">
              are horizontally scalable. are document, key-value,graph or
              wide-column stores.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-gray-600 text-3xl text-center my-4 italic text-semibold">
          What is the purpose of jwt and how does it work
        </h2>
        <div className="     grid  md:grid-cols-2  gap-5  grid-cols-1 gap-y-3">
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              purpose of jwt :{" "}
            </h2>
            <p>
              {" "}
              JSON Web Tokens are the new fancy kids around the block when it
              comes to transporting proofs of identity within an untrusted
              environment like the Web.
            </p>
            <p className="mt-2">
              A JWT is a mechanism to verify the owner of some JSON data. It's
              an encoded, URL-safe string that can contain an unlimited amount
              of data (unlike a cookie) and is cryptographically signed. When a
              server receives a JWT, it can guarantee the data it contains can
              be trusted because it's signed by the source
            </p>
          </div>
          <div>
            <h2 className="text-blue-300 text-2xl italic text-semibold">
              {" "}
              how does it work:
            </h2>
            <p>
              JWTs differ from other web tokens in that they contain a set of
              claims. Claims are used to transmit information between two
              parties. What these claims are depends on the use case at hand.
              For example, a claim may assert who issued the token, how long it
              is valid for, or what permissions the client has been granted.{" "}
            </p>
            <p className="mt-2">
              A JWT is a string made up of three parts, separated by dots (.),
              and serialized using base64. In the most common serialization
              format, compact serialization, the JWT looks something like this:
              xxxxx.yyyyy.zzzzz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
