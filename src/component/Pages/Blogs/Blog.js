import React from "react";

const Blog = () => {
  return (
    <div className="container mx-auto my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 gap-10">
        <div>
          <div
            tabindex="2"
            class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div class="collapse-title text-xl font-medium">
              How will you improve the performance of a React Application?
            </div>
            <div class="collapse-content">
              <ol className="list-decimal pl-4 font-bold">
                <li>
                  <span className="text-xl font-bold">
                    Using Immutable Data Structures
                  </span>
                </li>

                <li>
                  <span className="text-xl font-bold">
                    Function/Stateless Components and React.PureComponent
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    Multiple Chunk Files
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    Dependency optimization
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    {" "}
                    Use React.Fragments to Avoid Additional HTML Element
                    Wrappers
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    Avoid Inline Function Definition in the Render Function.
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    Throttling and Debouncing Event Action in JavaScript
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    {" "}
                    Avoid using Index as Key for map
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    Avoiding Props in Initial States
                  </span>
                </li>
                <li>
                  <span className="text-xl font-bold">
                    Spreading props on DOM elements
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div>
          <div
            tabindex="4"
            class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div class="collapse-title text-xl font-medium">
              How does prototypical inheritance work?
            </div>
            <div class="collapse-content">
              <p>
                Simply put, prototypical inheritance refers to the capability to
                access object properties from another object. We use a
                JavaScript prototype to add new properties and methods to an
                existing object constructor. We can also basically tell our JS
                code to inherit properties from a prototype. Prototypical
                inheritance allows us to exercise the parcels or methods from
                one JavaScript object to another through a reference pointer
                function.
              </p>
              <h2 className="font-bold text-lg text-secondary my-4">
                All JavaScript objects inherit properties and methods from a
                prototype
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div
            tabindex="6"
            class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div class="collapse-title text-xl font-medium">
              Why you do not set the state directly in React?
            </div>
            <div class="collapse-content">
              <p className="flex flex-col gap-8">
                One should noway modernize the state directly because of the
                following reasons
                <p>
                  Still, calling the setState() subsequently may just replace
                  the update you made, If you modernize it directly.{" "}
                </p>
                <p>
                  When you directly modernize the state, it doesn't
                  changethis.state incontinently. Rather, it creates a pending
                  state transition, and penetrating it after calling this system
                  will only return the present value.{" "}
                </p>
                <p>You'll lose control of the state across all factors.</p>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div
            tabindex="4"
            class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div class="collapse-title text-xl font-medium">
              What are the different ways to manage a state in a React
              application?
            </div>
            <div class="collapse-content">
              <p className="font-bold text-secondary text-xl">
                There are four main types of state you need to properly manage
                in your React apps:
              </p>
              <ol className="list-decimal pl-4">
                <li>
                  <span className="text-xl font-bold">Local state:-</span>
                  There are four main types of state you need to properly manage
                  in your React apps
                </li>
                <li>
                  <span className="text-xl font-bold">Global state:-</span>
                  Global state is data we manage across multiple components.
                </li>
                <li>
                  <span className="text-xl font-bold">Server state:-</span> Data
                  that comes from an external server that must be integrated
                  with our UI state.
                </li>
                <li>
                  <span className="text-xl font-bold">URL state:-</span> Data
                  that exists on our URLs, including the pathname and query
                  parameters.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div>
          <div
            tabindex="10"
            class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div class="collapse-title text-xl font-medium">
              What is a unit test? Why should write unit tests?
            </div>
            <div class="collapse-content">
              <p>
                Unit tests are generally automated tests written and run by
                software formulators to ensure that a section of an operation(
                known as the" unit") meets its design and behaves as intended.
                In procedural programming, a unit could be an entire module, but
                it's farther generally an individual function or procedure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
