import uuid

def get_next_id():
    return str(uuid.uuid4())

def get_order_text(orders):
    sql = ""

    if len(orders) > 0:
        sql = sql + " order by "
        for i in range(len(orders)):
            if i > 0:
                sql = sql + ","
            sql = sql + orders[i].name + " " + orders[i].direction

    return sql