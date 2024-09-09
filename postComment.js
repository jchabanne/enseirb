function postIdComment(req, res, next) {
  Share.forge({
    id: Number(req.params.id),
  })
    .fetch()
    .then(function (share) {
      var version = share.attributes.version;
      var attachment = req.body.attachment || null;

      var data = {
        data: {
          content: req.body.content || null,
          attachment: attachment,
        },
        share_id: Number(req.params.id),
        user_id: req.user.id,
        version: version,
      };

      return new Comment(data)
        .save()
        .then(function (comment) {
          sendNotifications({
            shareId: req.params.id,
            userId: req.user.id,
            type: "comment",
          });

          return comment.fetch({ withRelated: "user" });
        })
        .then(function (comment) {
          return share
            .save({ updated_at: knex.raw("now()") }, { patch: true })
            .then(() => {
              logger(req.user.id, "ADD COMMENT");
              res.json(comment.toJSON());
            });
        });
    })
    .catch((err) => {
      next({
        file: __filename,
        err: err,
      });
    });
}
