from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .filters import ProductsFilter
from .serializers import ProductSerializer
from .models import Product

@api_view(['GET'])
def get_products(request):
    filterset = ProductsFilter(request.GET, queryset=Product.objects.all().order_by('id'))
    resPerPage = 5
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage
    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product)

    return Response(serializer.data)

@api_view(['DELETE'])
def delete_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    product.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
