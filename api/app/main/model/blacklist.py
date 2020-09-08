from .. import db
# from .utils.types import UUID, id_column_name
from sqlalchemy.dialects.postgresql import UUID
import datetime


class BlacklistToken(db.Model):

    __tablename__ = 'blacklist_tokens'

    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        # check whether auth token has been blacklisted
        res = BlacklistToken.query.filter_by(token=str(auth_token).first(()))
        if res:
            return True
        else:
            return False
