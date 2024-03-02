dash/products/manage/xxxxxxx_product_id/xxxxxxx_change_key/title


Okay so normal routes untill manage

dash/products/manage/ -> This will give us the products manage page with app their products

dash/products/manage/xxxxxxx_product_id
This will give us a single product page with all the details

dash/products/manage/xxxxxxx_product_id/xxxxxxx_change_key
This will give us a change block that the user selected, as like a paid change. The user selects a section to change, then we create a object for that type in local memory and use that key here. We know its a change due to it being at this pos in the url, as nothing else would be here.

dash/products/manage/xxxxxxx_product_id/xxxxxxx_change_key/title/short
After the change key, a slug will be given "title/short" which would represent which object in the local memory we are changing. Here we can chain this all the way. and within this route we will just check for valid things we can change or return not found? as "title" say this wasing a changable element and only the "short" inside it. then we can just look for the changable elements with a switch statment and only handle those.
Maybe can not have keys as "xxx" as i mean we could just use the type of thing as "product_change" then our breadcrums are a bit better also and its not like we going to be doing multiple concurrent actions like this?