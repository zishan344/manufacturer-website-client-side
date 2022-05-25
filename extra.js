/* 
inputvalu
 <div class="action-top d-sm-flex">
              <div class=" ">
                <label for="quantity" class=" ">
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
              <button type="submit" class="btn btn-bordered btn-primary">
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
            <div class="action-top d-sm-flex">
              <div class="pro-qty mr-3 mb-4 mb-sm-0">
                <label for="quantity" class="sr-only">
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
                  class="inc qty-btn bts flex justify-center items-center"
                >
                  +
                </button>
                <button
                  onClick={down}
                  type="button"
                  class="dec qty-btn bts flex justify-center items-center"
                >
                  -
                </button>
              </div>
              <button type="submit" class="btn btn-bordered btn-primary">
                Add to Cart
              </button>
            </div>
          </form>
  */
