from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        products = Product.objects.all()
        serializer = self.get_serializer(products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        try:
            product = self.get_object()
        except Http404:
            return Response(
                {"message": "Product does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            product = self.get_object()
            product.delete()

            return Response(
                {"message": "Product was deleted permanently from DB."},
                status=status.HTTP_200_OK,
            )
        except Http404:
            return Response(
                {"message": "Product was deleted permanently from DB."},
                status=status.HTTP_200_OK,
            )

