from .. import db


class BaseTable():
    def save(self):
        db.session.add(self)
        db.session.commit()
