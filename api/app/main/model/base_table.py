from .. import db


class BaseTable():
    def update_and_save(self, model, id, data):
        db.session.query(model).filter(model.id == id).update(data)
        db.session.commit()

    def add(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def commit(self):
        db.session.commit()

    @classmethod
    def find(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
