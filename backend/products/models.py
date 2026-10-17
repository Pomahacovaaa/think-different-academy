from django.db import models

class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    cost = models.IntegerField()

    class Meta:
        db_table = "product"