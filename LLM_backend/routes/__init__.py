# routes/__init__.py
"""
Route Handlers Package
"""
from .test import add_test_route
from .sia_t1 import add_t1_route

__all__ = ['add_test_route', 'add_t1_route']