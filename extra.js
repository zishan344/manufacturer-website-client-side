/* 
{profile?.location && (
            <h2>
              Location:{" "}
              <span className="text-secondary font-bold">{user?.email}</span>{" "}
            </h2>
          )}
          {profile?.education && (
            <h2>
              Educations/Qualification:{" "}
              <span className="text-secondary font-bold">{user?.email}</span>{" "}
            </h2>
          )}
          {profile?.phone && (
            <h2>
              Phone:{" "}
              <span className="text-secondary font-bold">{user?.email}</span>{" "}
            </h2>
          )}
          {profile?.linkedin && (
            <h2>
              linkedin :{" "}
              <span className="text-secondary font-bold">{user?.email}</span>{" "}
            </h2>
          )}








inputvalu
 <div className="action-top d-sm-flex">
              <div className=" ">
                <label for="quantity" className=" ">
                  Quantity
                </label>
                <input
                  onChange={(e) => {
                    if (Number(e.target.value) > Number(product_quantity)) {
                      return toast.error("sorry product not available");
                    } else {
                      return setInputvalu(e.target.value);
                    }
                  }}
                  name="number"
                  type="number"
                  min={minimum_order}
                  max={product_quantity}
                  id="quantity"
                  title="Quantity"
                  Value={inputvalu}
                />
                
                
              </div>
              <button type="submit" className="btn btn-bordered btn-primary">
                Add to Cart
              </button>
            </div>


const up = () => {
    const quantity = Number(inputvalu) + 1;
    if (quantity > Number(product_quantity)) {
      return toast.error(`sorry product not available`);
    }
    setInputvalu(quantity);
  };
  const down = () => {
    const downQuantity = Number(inputvalu) - 1;
    if (downQuantity < Number(minimum_order)) {
      return toast.error(`sorry minimum order ${minimum_order}`);
    }
    setInputvalu(downQuantity);
  };
  
  <form onSubmit={addedCart}>
            <div className="action-top d-sm-flex">
              <div className="pro-qty mr-3 mb-4 mb-sm-0">
                <label for="quantity" className="sr-only">
                  Quantity
                </label>
                <input
                  onChange={(e) => {
                    if (Number(e.target.value) > Number(product_quantity)) {
                      return toast.error("sorry product not available");
                    } else {
                      return setInputvalu(e.target.value);
                    }
                  }}
                  name="number"
                  type="number"
                  min={minimum_order}
                  max={product_quantity}
                  id="quantity"
                  title="Quantity"
                  Value={inputvalu}
                />
                <button
                  onClick={up}
                  type="button"
                  className="inc qty-btn bts flex justify-center items-center"
                >
                  +
                </button>
                <button
                  onClick={down}
                  type="button"
                  className="dec qty-btn bts flex justify-center items-center"
                >
                  -
                </button>
              </div>
              <button type="submit" className="btn btn-bordered btn-primary">
                Add to Cart
              </button>
            </div>
          </form>
  */
